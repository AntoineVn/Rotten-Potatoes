import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import useLocalStorage from '../../hooks/useLocalstorage';
import Link from "next/link";
import Head from 'next/head'
import { useRouter } from "next/router";


export default function Management_users({ users }) {
  const router = useRouter();
  const localStorage = useLocalStorage;
  const token = localStorage('token')[0]
  const [userId, setUserId] = useState("")
  const [userRole, setUserRole] = useState("")
  const [role, setRole] = useLocalStorage("role", null);


  async function deleteClick(use) {
    console.log(token)
    await fetch('http://localhost:5000/users/' + use.id, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
    })
      .then((res) => res.json())
      .then((user) => console.log(user + " a été terminé!"));
    router.push("/administration/management_users")

  }


  async function editClick(user) {
    console.log(user)
    console.log(userRole)
    console.log(token)
    await fetch('http://localhost:5000/users/' + user, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        "role": userRole
      })
    })
      .then((res) => res.json())
      .then((user) => console.log(user.user.role))
    router.push("/administration/management_users")
  }

  const back = () => {
    router.push('/')
  }

  return (
    <div>
      <Head>
        <title>RottenPotatoes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      { role != "admin" && (
        <div className="flex flex-col">
          <h1 className="text-center text-5xl text-red-600">Unauthorized </h1>

          <button
            className="ml-auto mr-auto mt-20 w-40 rounded text-xl 
                  bg-white text-red-500 hover:text-red-600"
            onClick={back}
          >
            Back to Home
          </button>
        </div>
      )}

      { role == "admin" && (
        <div>
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Username
                    </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                    </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          User
                    </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Admin
                    </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Delete</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.email}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">{user.username}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {user.role == "user" || user.role == undefined && (
                                <div className="text-sm text-gray-500">{user.role}</div>
                              )}
                              {user.role == "admin" && (
                                <input type="checkbox" className=" checked:bg-blue-600 checked:border-transparent" onChange={(e) => setUserRole("user")} />
                              )}

                            </div>

                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {user.role == "admin" && (
                                <div className="text-sm text-gray-500">{user.role}</div>
                              )}
                              {user.role == "user" && (
                                <input type="checkbox" className=" checked:bg-blue-600 checked:border-transparent" onChange={(e) => setUserRole("admin")} />
                              )}
                            </div>

                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="modal-toggle" onClick={(e) => editClick(user.id)}>
                              Edit
                        </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="modal-toggle" onClick={(e) => deleteClick(user)}>
                              Delete
                        </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <style jsx="true">{`
        .App {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        button.modal-toggle,
        input[type="submit"] {
          background-color: turquoise;
          cursor: pointer;
          padding: 1rem 2rem;
          text-transform: uppercase;
          border: none;
        }

        button.modal-toggle:not(:first-child) {
          margin-left: 10px;
        }

        .form-group {
          margin-top: 10px;
        }

        input[type="text"],
        input[type="password"],
        input[type="email"] {
          box-sizing: border-box;
          width: 100%;
          padding: 0.5rem 0.7rem;
        }
      `}</style>
        </div>
      )}

    </div>
  )
}


export async function getStaticProps() {
  /* const localStorage = useLocalStorage
  const token = localStorage("token")[0] */

  const res = await fetch('http://localhost:5000/users', {
    method: 'GET',
    header: {
      "Content-Type": "application/json",
      //Authorization: "Bearer " + token
    },
  });

  const users = await res.json()
  if (!users || users === undefined) return <div> Loading...</div>

  return {
    props: {
      users: users
    }
  }
}
