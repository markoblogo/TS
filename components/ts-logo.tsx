import Image from "next/image";

type Props = {
  className?: string;
  priority?: boolean;
};

export function TsLogo({ className = "", priority = false }: Props) {
  return (
    <span className={`relative inline-flex ${className}`}>
      <Image
        src="/assets/logos/ts-logo-light.svg"
        alt="Trade Solutions logo"
        width={44}
        height={44}
        priority={priority}
        className="block dark:hidden"
      />
      <Image
        src="/assets/logos/ts-logo-dark.svg"
        alt="Trade Solutions logo"
        width={44}
        height={44}
        priority={priority}
        className="hidden dark:block"
      />
    </span>
  );
}
