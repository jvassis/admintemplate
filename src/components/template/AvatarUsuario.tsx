import useAuth from "../../data/hook/useAuth";
import Link from 'next/link'

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario (props: AvatarUsuarioProps) {
    const { usuario } = useAuth()

    console.log(usuario)

    return (
        <Link href='/perfil'>
            <img
                src={usuario?.imageUrl ?? '/images/avatar.webp'}
                alt='Avatar do Usuário'
                className={`
                    h-10 w-10 rounded-full cursor-pointer
                    ${props.className}
                `}
            />
        </Link>
    )
}