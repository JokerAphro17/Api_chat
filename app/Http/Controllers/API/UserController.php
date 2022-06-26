<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\API\BaseController;

class UserController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::all();
        return $this->sendResponse($user, 'Utilisateur envoyer avec success.');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required',
            'prenom'=>'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 200);
        }
        $mailExist = User::where('email', $request->email)->first();
        if($mailExist){
            return response()->json(['success' => false, 'message' => 'Cet email existe déjà.'], 200);
        }
        $input = $request->all();
        
        $input['password'] = \Hash::make($input['password']);
        $user = User::create($input);
        $success['token'] = $user->createToken('MyApp')->accessToken;
        $success['nom'] = $user->nom;
        $success['prenom'] = $user->prenom;
        return $this->sendResponse($success, 'Votre compte a été creer avec success.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {   
        return $this->sendResponse($user, 'Utilisateur envoyer avec success.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Erreur de la validation.', $validator->errors());
        }
        $useur = User::where('email', $request->email)->first();
        if(!$useur){
            return $this->sendError('Email ou mot de passe incorrect.', $useur);
        }
        if(!\Hash::check($request->password, $useur->password)){
            return $this->sendError('Email ou mot de passe incorrect.', $useur);
        }
        return $this->sendResponse($useur, 'Connexion reussie.');
    }
}

