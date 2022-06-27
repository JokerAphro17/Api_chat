<?php

namespace App\Http\Controllers\API;

use App\Models\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Validator;
use App\Http\Controllers\API\BaseController;

class MessageController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $messages = \App\Models\Message::with('sender', 'receiver')->get();
        return $this->sendResponse($messages, 'Messages retrieved successfully.');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = \Validator::make($input, [
            'sender_id' => 'required',
            'receiver_id' => 'required',
            'message' => 'required'
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
        $message = Message::create($input);
        return $this->sendResponse($message, 'Message created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function all(Request $request)
    {   
        $input = $request->all();
        $validator = \Validator::make($input, [
            'sender_id' => 'required',
            'receiver_id' => 'required'
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $messageSend = Message::where('sender_id', $input['sender_id'])->where('receiver_id', $input['receiver_id'])->get();
        
        $messageReceived = Message::where('sender_id', $input['receiver_id'])->where('receiver_id', $input['sender_id'])->get();
        $messages = $messageSend->merge($messageReceived);
        return $this->sendResponse($messages, 'Messages retrieved successfully.');
    }
  
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
