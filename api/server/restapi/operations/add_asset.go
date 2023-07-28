// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// AddAssetHandlerFunc turns a function with the right signature into a add asset handler
type AddAssetHandlerFunc func(AddAssetParams) middleware.Responder

// Handle executing the request and returning a response
func (fn AddAssetHandlerFunc) Handle(params AddAssetParams) middleware.Responder {
	return fn(params)
}

// AddAssetHandler interface for that can handle valid add asset params
type AddAssetHandler interface {
	Handle(AddAssetParams) middleware.Responder
}

// NewAddAsset creates a new http.Handler for the add asset operation
func NewAddAsset(ctx *middleware.Context, handler AddAssetHandler) *AddAsset {
	return &AddAsset{Context: ctx, Handler: handler}
}

/*
	AddAsset swagger:route POST /api/assets addAsset

Add MRC-20 token information and persist it for future use.
*/
type AddAsset struct {
	Context *middleware.Context
	Handler AddAssetHandler
}

func (o *AddAsset) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewAddAssetParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}
