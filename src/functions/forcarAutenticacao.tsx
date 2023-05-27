import Image from "next/image"
import loading from "../../public/images/loading.svg"
import useAuth from "../data/hook/useAuth"
import { useRouter } from "next/router"
import Head from "next/head"

export default function forcarAutenticacao(jsx) {
    const { usuario, carregando } = useAuth()

    function renderizarConteudo() {
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            if(!document.cookie?.includes("admin-template-auth")) {
                                window.location.href = "/autenticacao"
                            }
                            `
                        }}
                    />
                </Head>
                {jsx}
            </>
        )
    }

    function renderizarCarregando() {
        return (
            <div className={`
                flex justify-center items-center
                h-screen
            `}>
                <Image src={loading} alt="Loading"/>
            </div>
        )
    }

    if (!carregando && usuario?.email) {
        return renderizarConteudo()
    } else if (carregando) {
        return renderizarCarregando()
    } else {
        const router = useRouter()
        router.push('/autenticacao')
        return null
    }
}