import logoSrc from '../../assets/GRUPO_CIS_LOGO.png';

interface LogoMarkProps { size?: number }

export function LogoMark({ size = 36 }: LogoMarkProps) {
    return (
        <img
            src={logoSrc}
            alt="Grupo CIS"
            style={{
                height: size,
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
            }}
        />
    );
}
