import { Brand, navIds } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Copy, Locale } from "@/lib/translations";

export function SiteFooter({
  copy,
  locale,
}: {
  copy: Copy;
  locale: Locale;
}) {
  const homeHref = `/${locale}`;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <a href={homeHref} aria-label={copy.homeLabel}>
              <Brand subtitle={copy.brandSubtitle} />
            </a>
            <p>{copy.footerLine}</p>
          </div>
          <nav aria-label={copy.footerNavLabel}>
            {copy.nav.slice(0, 3).map((label, index) => (
              <a
                className="nav-link"
                key={label}
                href={`${homeHref}#${navIds[index]}`}
              >
                {label}
              </a>
            ))}
            <a className="nav-link" href={`${homeHref}/first-visit`}>
              {copy.practitionerLink}
            </a>
            <a className="nav-link" href={`${homeHref}#contact`}>
              {copy.nav[5]}
            </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Lilianne Acupuncture.{" "}
            {copy.copyright}
          </span>
          <span>{copy.footerNote}</span>
          <Dialog>
            <DialogTrigger className="nav-link">{copy.privacy}</DialogTrigger>
            <DialogContent showCloseButton={false}>
              <DialogHeader>
                <DialogTitle>{copy.privacyTitle}</DialogTitle>
                <DialogDescription>{copy.privacyBody}</DialogDescription>
              </DialogHeader>
              <DialogClose render={<Button variant="outline" />}>
                {copy.close}
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </footer>
  );
}
