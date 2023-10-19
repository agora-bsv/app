// pages/api/hc/user.js
import SessionTokenRepository from "../../../src/repositories/SessionTokenRepository";

export default async function handler(req, res) {
    //   // const {sessionToken} = query;
    //   const cookies = req.headers.cookie || '';
    //   const sessionTokenFromCookie = cookies
    //     .split('; ')
    //     .find(row => row.startsWith('sessionToken='))
    //     ?.split('=')[1];
    //   console.log('sessionTokenFromCookie', sessionTokenFromCookie)
  try {
    // Extrair o cookie do request.
    const { sessionToken } = req.cookies; // O nome do cookie pode ser diferente.

    if (!sessionToken) {
      // Se não houver token de sessão, retorne um erro ou um status que indique que nenhum usuário está logado.
      return res.status(401).json({ message: 'No authentication token found.' });
    }

    // Obter informações da sessão (você pode precisar validar o token, buscar informações adicionais do usuário, etc.)
    const user = sessionToken ? SessionTokenRepository.decode(sessionToken).user : false;

    // if (!session) {
    //   // Se a sessão não for válida, retorne um erro ou um status que indique que a autenticação falhou.
    //   return res.status(401).json({ message: 'Invalid session.' });
    // }

    // Retornar as informações do usuário.
    res.status(200).json({ user: user }); 
  } catch (error) {
    // Tratamento de erro
    console.error('Session retrieval failed:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}