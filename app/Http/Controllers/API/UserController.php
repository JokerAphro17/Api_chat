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
    public function show($id)
    {   
        $user = User::find($id);
        if(!$user){
            return response()->json(['success' => false, 'message' => 'Cet utilisateur n\'existe pas.'], 404);
        }
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
        $user = User::where('email', $request->email)->first();
        if(!$user){
            return $this->sendError('Email ou mot de passe incorrect.', $user);
        }
        if(!\Hash::check($request->password, $user->password)){
            return $this->sendError('Email ou mot de passe incorrect.', $user);
        }
        // get user token 
        

        return $this->sendResponse($user, 'Connexion reussie.');
    }
    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'search' => 'required',
        ]);
        if(!$validator->fails()){
            $user = User::where('nom', 'like', '%'.$request->search.'%')->orWhere('prenom', 'like', '%'.$request->search.'%')->get();
            return $this->sendResponse($user, 'Utilisateur envoyer avec success.');
        }
        $users = User::all();
        return $this->sendResponse($users, 'Utilisateur envoyer avec success.');
    }
        

}

