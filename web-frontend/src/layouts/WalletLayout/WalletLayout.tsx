import { ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResource } from '../../custom/api';
import { AccountObject } from '../../models/AccountModel';
import { routeFor } from '../../utils';

import {
  Dropdown,
  MassaWallet,
  SideMenu,
  Identicon,
} from '@massalabs/react-ui-kit';
import {
  FiHome,
  FiList,
  FiArrowUpRight,
  FiUsers,
  FiDisc,
  FiSettings,
  FiSun,
} from 'react-icons/fi';

export enum MenuItem {
  Home = 'home',
  SendReceive = 'send-receive',
  Transactions = 'transactions',
  Contacts = 'contacts',
  Assets = 'assets',
  Settings = 'settings',
  LightTheme = 'light-theme',
}

interface WalletProps {
  menuItem: MenuItem;
  children: ReactNode;
}

function WalletLayout(props: WalletProps) {
  const { menuItem } = props;
  const navigate = useNavigate();
  const { nickname } = useParams();

  const { data: accounts = [] } = useResource<AccountObject[]>('accounts');

  // If no account, redirect to welcome page
  if (!accounts.length) {
    navigate(routeFor('index'));
  }

  function isActive(item: MenuItem) {
    return item === menuItem;
  }

  let menuConf = {
    title: 'MassaWallet',
    logo: <MassaWallet />,
    fullMode: true,
  };

  let menuItems = [
    {
      label: 'Wallet',
      icon: <FiHome />,
      active: isActive(MenuItem.Home),
      footer: false,
      onClickItem: () => navigate(routeFor(`${nickname}/${MenuItem.Home}`)),
    },
    {
      label: 'Transactions',
      icon: <FiList />,
      active: isActive(MenuItem.Transactions),
      footer: false,
      onClickItem: () =>
        navigate(routeFor(`${nickname}/${MenuItem.Transactions}`)),
    },
    {
      label: 'Send/Receive',
      icon: <FiArrowUpRight />,
      active: isActive(MenuItem.SendReceive),
      footer: false,
      onClickItem: () =>
        navigate(routeFor(`${nickname}/${MenuItem.SendReceive}`)),
    },
    {
      label: 'Contacts',
      icon: <FiUsers />,
      active: isActive(MenuItem.Contacts),
      footer: false,
      onClickItem: () => navigate(routeFor(`${nickname}/${MenuItem.Contacts}`)),
    },
    {
      label: 'Assets',
      icon: <FiDisc />,
      active: isActive(MenuItem.Assets),
      footer: false,
      onClickItem: () => navigate(routeFor(`${nickname}/${MenuItem.Assets}`)),
    },
    {
      label: 'Settings',
      icon: <FiSettings />,
      active: isActive(MenuItem.Settings),
      footer: true,
      onClickItem: () => navigate(routeFor(`${nickname}/${MenuItem.Settings}`)),
    },
    {
      label: 'Light theme',
      icon: <FiSun />,
      active: isActive(MenuItem.LightTheme),
      footer: true,
    },
  ];

  const accountsItems = accounts.map((account) => ({
    icon: <Identicon username={account.nickname} size={32} />,
    item: account.nickname,
    onClick: () => navigate(routeFor(`${account.nickname}/${MenuItem.Home}`)),
  }));

  const selectedAccountKey: number = parseInt(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Object.keys(accounts).find(
      (_, idx) => accounts[idx].nickname === nickname,
    )!,
  );

  return (
    <div className="bg-primary min-h-screen">
      <div
        className="flex flex-col justify-center h-screen
        min-w-fit text-f-primary m-auto"
      >
        <SideMenu conf={menuConf} items={menuItems} />
        <div className="absolute top-0 right-0 m-6">
          <Dropdown options={accountsItems} select={selectedAccountKey} />
        </div>
        {props?.children}
      </div>
    </div>
  );
}

export default WalletLayout;