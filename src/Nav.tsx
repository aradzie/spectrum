import { pages } from "./pages/pages.tsx";

export function Nav({
  pageIndex,
  onPageIndexChange,
}: {
  pageIndex: number;
  onPageIndexChange: (index: number) => void;
}) {
  return (
    <ul>
      {pages.map((page, index) => {
        return (
          <li key={index}>
            <a
              href="#"
              onClick={(ev) => {
                ev.preventDefault();
                onPageIndexChange(index);
              }}
            >
              {page.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
