// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"github.com/massalabs/thyra-plugin-massa-core/api/server/models"
)

// RestWalletListOKCode is the HTTP code returned for type RestWalletListOK
const RestWalletListOKCode int = 200

/*RestWalletListOK Wallets retrieved

swagger:response restWalletListOK
*/
type RestWalletListOK struct {

	/*
	  In: Body
	*/
	Payload []*models.Wallet `json:"body,omitempty"`
}

// NewRestWalletListOK creates RestWalletListOK with default headers values
func NewRestWalletListOK() *RestWalletListOK {

	return &RestWalletListOK{}
}

// WithPayload adds the payload to the rest wallet list o k response
func (o *RestWalletListOK) WithPayload(payload []*models.Wallet) *RestWalletListOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the rest wallet list o k response
func (o *RestWalletListOK) SetPayload(payload []*models.Wallet) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *RestWalletListOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	payload := o.Payload
	if payload == nil {
		// return empty array
		payload = make([]*models.Wallet, 0, 50)
	}

	if err := producer.Produce(rw, payload); err != nil {
		panic(err) // let the recovery middleware deal with this
	}
}

// RestWalletListBadRequestCode is the HTTP code returned for type RestWalletListBadRequest
const RestWalletListBadRequestCode int = 400

/*RestWalletListBadRequest Bad request.

swagger:response restWalletListBadRequest
*/
type RestWalletListBadRequest struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewRestWalletListBadRequest creates RestWalletListBadRequest with default headers values
func NewRestWalletListBadRequest() *RestWalletListBadRequest {

	return &RestWalletListBadRequest{}
}

// WithPayload adds the payload to the rest wallet list bad request response
func (o *RestWalletListBadRequest) WithPayload(payload *models.Error) *RestWalletListBadRequest {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the rest wallet list bad request response
func (o *RestWalletListBadRequest) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *RestWalletListBadRequest) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(400)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// RestWalletListInternalServerErrorCode is the HTTP code returned for type RestWalletListInternalServerError
const RestWalletListInternalServerErrorCode int = 500

/*RestWalletListInternalServerError Internal Server Error - The server has encountered a situation it does not know how to handle.

swagger:response restWalletListInternalServerError
*/
type RestWalletListInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewRestWalletListInternalServerError creates RestWalletListInternalServerError with default headers values
func NewRestWalletListInternalServerError() *RestWalletListInternalServerError {

	return &RestWalletListInternalServerError{}
}

// WithPayload adds the payload to the rest wallet list internal server error response
func (o *RestWalletListInternalServerError) WithPayload(payload *models.Error) *RestWalletListInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the rest wallet list internal server error response
func (o *RestWalletListInternalServerError) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *RestWalletListInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
