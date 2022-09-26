import Link from "next/link";
import Breadcrumbs from "nextjs-breadcrumbs";

export default function PageHeaderBlock({ title, tripPage }) {
  const convertBreadcrumb = (string) => {
    return (
      string
        .replace(/-/g, " ")
        .replace(/oe/g, "ö")
        .replace(/ae/g, "ä")
        .replace(/ue/g, "ü")
        .charAt(0)
        .toUpperCase() + string.slice(1).replace(/-/g, " ")
    );
  };
  return (
    <>
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1 className="section-title h2 mb-3">
                <span>{convertBreadcrumb(title)}</span>
              </h1>

              <ul className="list-inline breadcrumb-menu mb-4">
                <li className="d-inline">
                  <Link href="/">
                    <a>
                      <i
                        className="d-inline-block text-dark"
                        style={{ transform: "translateY(-" + 2 + "px)" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <polyline points="5 12 3 12 12 3 21 12 19 12"></polyline>
                          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                        </svg>
                      </i>
                      <span className="ms-2">Home</span>
                    </a>
                  </Link>
                </li>
                <Breadcrumbs
                  useDefaultStyle={true}
                  omitRootLabel={true}
                  activeItemClassName={"d-inline ms-3"}
                  inactiveItemClassName={"d-inline ms-3"}
                  omitIndexList={tripPage && [1, 2]}
                  listStyle={{
                    listStyle: "none",
                    textTransform: "capitalize",
                  }}
                />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
