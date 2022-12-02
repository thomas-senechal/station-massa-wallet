// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"github.com/massalabs/thyra-plugin-massa-core/api/server/models"
)

// WebWalletOKCode is the HTTP code returned for type WebWalletOK
const WebWalletOKCode int = 200

/*WebWalletOK Page found

swagger:response webWalletOK
*/
type WebWalletOK struct {
}

// NewWebWalletOK creates WebWalletOK with default headers values
func NewWebWalletOK() *WebWalletOK {

	return &WebWalletOK{}
}

// WriteResponse to the client
func (o *WebWalletOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(200)
}

// WebWalletNotFoundCode is the HTTP code returned for type WebWalletNotFound
const WebWalletNotFoundCode int = 404

/*WebWalletNotFound Resource not found.

swagger:response webWalletNotFound
*/
type WebWalletNotFound struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewWebWalletNotFound creates WebWalletNotFound with default headers values
func NewWebWalletNotFound() *WebWalletNotFound {

	return &WebWalletNotFound{}
}

// WithPayload adds the payload to the web wallet not found response
func (o *WebWalletNotFound) WithPayload(payload *models.Error) *WebWalletNotFound {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the web wallet not found response
func (o *WebWalletNotFound) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *WebWalletNotFound) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(404)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
