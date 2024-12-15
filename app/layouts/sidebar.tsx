import { getContacts } from "../data";
import { Form, Link, NavLink, Outlet, useNavigation } from "react-router";
import type { Route } from "../+types/root";

export async function loader() {
  const contacts = await getContacts();
  if (!contacts) {
    throw new Response("No contacts", { status: 404 });
  }
  return { contacts };
}

export default function SidebarLayout({ loaderData }: Route.ComponentProps) {
    const { contacts } = loaderData;
    const navigation = useNavigation();

    return (
      <>
        <div id="sidebar">
          <h1>
            <Link to={"about"}>React Router Contacts</Link>
          </h1>
          <div>
            <Form id="search-form" role="search">
              <input
                aria-label="Search contacts"
                id="q"
                name="q"
                placeholder="Search"
                type="search"
              />
              <div aria-hidden hidden={true} id="search-spinner" />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    <NavLink to={`contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}
                      {contact.favorite ? (
                        <span>*</span>
                      ) : null}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No Contacts</i>
              </p>
            )
            
            }
          </nav>
        </div>
        <div
          className={
            navigation.state === "loading" ? "loading" : ""
          } 
          id="detail">
          <Outlet />
        </div>
      </>
    );
}