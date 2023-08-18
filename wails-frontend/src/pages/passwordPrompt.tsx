import { useState, useRef, SyntheticEvent, ReactNode } from 'react';

import { toMAS } from '@massalabs/massa-web3';
import { Password, Button, Balance } from '@massalabs/react-ui-kit';
import { SendPromptInput } from '@wailsjs/go/walletapp/WalletApp';
import { EventsOnce } from '@wailsjs/runtime';
import { FiArrowRightCircle, FiLock, FiTrash2 } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  events,
  promptAction,
  promptRequest,
  promptResult,
} from '@/events/events';
import Intl from '@/i18n/i18n';
import { Layout } from '@/layouts/Layout/Layout';
import {
  parseForm,
  ErrorCode,
  IErrorObject,
  formatStandard,
  maskAddress,
  handleApplyResult,
  handleCancel,
} from '@/utils';

interface PromptRequestDeleteData {
  Nickname: string;
  Balance: string;
}

interface PromptRequestTransferData {
  NicknameFrom: string;
  Amount: string;
  Fee: string;
  RecipientAddress: string;
}

interface PromptRequestCallSCData {
  OperationID: number;
  GasLimit: number;
  Coins: number;
  Address: string;
  CalledFunction: string;
  FromAddress: string;
  OperationType?: string; // Add the OperationType field here
}

function TransferLayout(props: PromptRequestTransferData) {
  let { Amount, NicknameFrom, RecipientAddress, Fee } = props;

  return (
    <div className="p-4 mb-2 bg-secondary rounded-lg w-full">
      <Balance amount={formatStandard(Number(toMAS(Amount)))} />
      <div className="mb-4 mt-2 mas-caption">
        {Intl.t('password-prompt.transfer.fee', { fee: Fee })}
      </div>
      <div className="flex items-center gap-2">
        {Intl.t('password-prompt.transfer.from')}
        <b>{NicknameFrom}</b>
      </div>
      <div className="flex items-center gap-2">
        {Intl.t('password-prompt.transfer.to')}
        <p>{maskAddress(RecipientAddress)}</p>
      </div>
    </div>
  );
}

function SignLayout(props: PromptRequestCallSCData) {
  const {
    GasLimit,
    Coins,
    Address,
    CalledFunction,
    FromAddress,
    OperationType,
  } = props;

  return (
    <div className="flex flex-col gap-5">
      {OperationType === 'Call SC' ? (
        <>
          <div className="flex w-full h-11 items-center justify-between bg-red-500">
            <div className="flex flex-col">
              <p>From: </p>
              <p>{maskAddress(FromAddress)}</p>
            </div>
            <FiArrowRightCircle size={32} />
            <div className="flex flex-col">
              <p>To: </p>
              <p>{maskAddress(Address)}</p>
            </div>
          </div>

          <hr
            className="h-0.5 border-t-0 bg-transparent bg-gradient-to-r 
        from-transparent via-tertiary to-transparent opacity-100"
          />

          <div>Gas Limit: {GasLimit}</div>
          <div>Coins: {Coins}</div>
          <div>
            Operation Type:
            {OperationType}
          </div>
          <div>Function: {CalledFunction}</div>
          <div>FromAddress: {FromAddress}</div>
        </>
      ) : (
        <div>Other Sign Data Content</div>
      )}
    </div>
  );
}

function PasswordPrompt() {
  const navigate = useNavigate();
  const form = useRef(null);

  const { state } = useLocation();
  const req: promptRequest = state.req;
  const data: PromptRequestDeleteData | PromptRequestTransferData = req.Data;

  const { deleteReq, signReq, transferReq } = promptAction;

  function getTitle() {
    switch (req.Action) {
      case deleteReq:
        return Intl.t('password-prompt.title.delete');
      case signReq:
        return Intl.t('password-prompt.title.sign');
      default:
        return Intl.t(`password-prompt.title.${req.CodeMessage}`);
    }
  }

  function getButtonLabel() {
    switch (req.Action) {
      case deleteReq:
        return Intl.t('password-prompt.buttons.delete');
      case signReq:
        return Intl.t('password-prompt.buttons.sign');
      case transferReq:
        return Intl.t('password-prompt.buttons.transfer');
      default:
        return Intl.t('password-prompt.buttons.default');
    }
  }

  function getSubtitle() {
    switch (req.Action) {
      case deleteReq:
        return Intl.t('password-prompt.subtitle.delete');
      case signReq: {
        const signData = req.Data as PromptRequestCallSCData;
        console.log(signData);
        if (signData.OperationType === 'Call SC') {
          return <SignLayout {...signData} />;
        } else {
          return Intl.t('password-prompt.subtitle.sign');
        }
      }
      case promptAction.transferReq: {
        const transferData = req.Data as PromptRequestTransferData;
        return <TransferLayout {...transferData} />;
      }
      default:
        return Intl.t('password-prompt.subtitle.default');
    }
  }

  function getButtonIcon(): ReactNode {
    switch (req.Action) {
      case deleteReq:
        return <FiTrash2 />;
      case signReq:
      case transferReq:
        // no icon for sign and transfer requests
        return;
      default:
        return <FiLock />;
    }
  }

  // error state for the input password field
  const [error, setError] = useState<IErrorObject | null>(null);

  function validate(e: SyntheticEvent) {
    const formObject = parseForm(e);
    const { password } = formObject;

    if (!password || !password.length) {
      setError({ password: Intl.t('errors.PasswordRequired') });
      return false;
    }

    return true;
  }

  function save(e: SyntheticEvent) {
    const form = parseForm(e);
    const { password } = form;

    EventsOnce(events.promptResult, handleResult);

    SendPromptInput(password);
  }

  function handleResult(result: promptResult) {
    let { Success, CodeMessage } = result;

    if (!Success) {
      if (CodeMessage === ErrorCode.WrongPassword) {
        setError({ password: Intl.t(`errors.${CodeMessage}`) });
        return;
      }
      handleApplyResult(navigate, req, setError, false)(result);
    } else {
      handleApplyResult(navigate, req, setError, false)(result);
    }
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (!validate(e)) return;

    const form = parseForm(e);
    const { password } = form;

    if (
      req.Action === deleteReq &&
      (data as PromptRequestDeleteData).Balance !== '0'
    ) {
      navigate('/confirm-delete', { state: { req, password } });
    } else {
      save(e);
    }
  }

  return (
    <Layout>
      <form ref={form} onSubmit={handleSubmit}>
        <h1 className="mas-title">{getTitle()}</h1>
        <div className="mas-body pt-4 break-words">{getSubtitle()}</div>
        <div className="pt-4">
          <Password
            defaultValue=""
            name="password"
            placeholder="Password"
            error={error?.password}
          />
        </div>
        <div className="pt-4 flex gap-4">
          <Button variant={'secondary'} onClick={handleCancel}>
            {Intl.t('password-prompt.buttons.cancel')}
          </Button>
          <Button preIcon={getButtonIcon()} type="submit">
            {getButtonLabel()}
          </Button>
        </div>
      </form>
    </Layout>
  );
}

export default PasswordPrompt;
