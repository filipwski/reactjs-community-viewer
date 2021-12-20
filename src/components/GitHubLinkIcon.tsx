type Props = {
  className?: string;
  href: string;
}

export const GitHubLinkIcon = ({ className, href }: Props) => (
  <a href={href} target="_blank" rel="noreferrer">
    <img
      alt="GitHub logo"
      className={className}
      src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    />
  </a>
);
