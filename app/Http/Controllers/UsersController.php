<?php

namespace App\Http\Controllers;


use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::get();
        return $users;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{

            $user = new  User([
                "name" => $request->name,
                "email"=> $request->email,
                "password"=> $request->password
            ]);
$user->save();
           // $user = User::create($request->all());
            return "salvo com sucesso" ;
        }catch(Exception $e){
            return $e;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return $user;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $user->update($request->all());
        return response()->json(['message' => 'User updated successfully', 'user' => $user], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function destroyByEmail($email)
    {
        // Encontre o usuário pelo email
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }

        // Exclua o usuário encontrado
        $user->delete();

        return response()->json(['message' => 'Usuário excluído com sucesso']);
    }

    public function updateByEmail(Request $request, $email)
    {
        // Encontre o usuário pelo email
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }

        // Valide os dados recebidos na requisição
        $request->validate([
            'name' => 'string',
            'email' => 'email|unique:users,email,' . $user->id,
            // Adicione aqui as outras regras de validação conforme necessário
        ]);

        // Atualize os dados do usuário
        $user->update($request->all());

        return response()->json(['message' => 'Usuário atualizado com sucesso']);
    }
}
