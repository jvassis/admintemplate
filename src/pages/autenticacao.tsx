import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { IconeAtencao } from "../components/icons";
import useAuth from "../data/hook/useAuth";

const images = [
    'https://images.unsplash.com/photo-1684054836845-5658a573b779?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1680212703757-2565f02a653e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1683203013887-42a4d973b616?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80',
    'https://images.unsplash.com/photo-1680847819533-7b1ee6651a0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
    'https://images.unsplash.com/photo-1684361822885-100cc43b7f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1684458196035-5a9783e97f6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    'https://images.unsplash.com/photo-1684652275754-aae11d30b8b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    'https://images.unsplash.com/photo-1684479903106-a5091823d854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1684779847639-fbcc5a57dfe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1683631167883-d4714617f826?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80'
]

export default function Autenticacao() {
    const { cadastrar, login, loginGoogle } = useAuth()

    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState<string | null>(null)

    function exibirErro(msg: string, tempoEmSeg = 5) {
        setErro(msg)
        setTimeout(() => setErro(null), tempoEmSeg * 1000)
    }

    async function submeter() {
        try {
            if (modo === 'login') {
                await login(email, senha)
            } else {
                await cadastrar(email, senha)
            }    
        } catch(e) {
            exibirErro(e?.message ?? 'Erro desconhecido!')
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="hidden md:block md:w-1/2 lg:w-2/3">
                <img
                    src={images[Math.round(Math.random() * 9)]}
                    alt="Imagem da Tela de Autenticação"
                    className="h-screen w-full object-cover" 
                />
            </div>
            <div className="md:w-1/2 w-full m-10 lg:w-1/3">
            <h1 className={`
                text-3xl font-bold mb-5
            `}>
                { modo === 'login' ? 'Entre com a Sua Conta': 'Cadastre-se na Plataforma' }
            </h1>
            
            {erro ? (
                <div className={`
                    flex items-center
                    bg-red-400 text-white py-3 px-5 my-2
                    border border-red-700 rounded-lg
                `}>
                    {IconeAtencao()}
                    <span className="ml-3" >{erro}</span>
                </div>
            ) : false}

            <AuthInput
                label="Email"
                valor={email}
                valorMudou={setEmail}
                obrigratorio
            />
            <AuthInput
                label="Senha"
                valor={senha}
                tipo="password"
                valorMudou={setSenha}
                obrigratorio
            />

            <button onClick={submeter} className={`
                w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6
            `}>
                { modo === 'login' ? 'Entrar': 'Cadastrar' }
            </button>
            <hr className="my-6 border-gray-300 w-full" />
            <button onClick={loginGoogle} className={`
                w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3
            `}>
                Entrar com o Google
            </button>
            {modo === 'login' ? (
                <p className="mt-8">
                    Novo por aqui?
                    <a
                        onClick={() => setModo('cadastro')}
                        className={`
                            text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                        `}
                    > Crie uma conta gratuitamente</a>
                </p>
            ) : (
                <p className="mt-8">
                    Já faz parte da nossa comunidade?
                    <a
                        onClick={() => setModo('login')}
                        className={`
                            text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                        `}
                    > Entre com as suas credenciais</a>
                </p>
            )}
        </div>
        </div>
    )
}