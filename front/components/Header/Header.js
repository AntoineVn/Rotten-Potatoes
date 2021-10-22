import { useState } from "react";
import useSWR from 'swr';
import Image from "next/image";
import Link from "next/link";
import HeaderItem from "./HeaderItem";
import {
  HomeIcon,
  UserIcon,
  SearchIcon,
  FilmIcon,
  HeartIcon,
  LoginIcon,
  ChartBarIcon,
  CursorClickIcon,
  CogIcon,
  LogoutIcon,
  ViewListIcon,
  DatabaseIcon,
} from "@heroicons/react/outline";
import useLocalStorage from '../../hooks/useLocalstorage';
import { useRouter } from "next/router";

const baseUrl = "http://localhost:4000/movies/title/"
const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Header() {
  const router = useRouter();
  const [searchBar, setSearchBar] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [token, setToken] = useLocalStorage("token", null);
  const [userId, setUserId] = useLocalStorage("userId", null);
  const [username, setUsername] = useLocalStorage("username", null);
  const [role, setRole] = useLocalStorage("role", null);
  console.log(showForm)

  const logout = (e) => {
    setToken(null);
    setUserId(null)
    setUsername(null)
    setRole(null)
    router.push("/");
  };

  const back = () => {
    router.push("/")
  }

  return (
    <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">


      { userId == null && (
        <div className="flex flex-grow justify-evenly max-w-6xl">
          <div className="flex flex-grow justify-evenly max-w-6xl">

            <Link href="/">
              <a>
                <HeaderItem title="HOME" Icon={HomeIcon} />
              </a>
            </Link>

            <div>
              <HeaderItem title="SEARCH" Icon={SearchIcon} onClick={(e) => setShowForm(true)} />
              {showForm && (
                <form >
                  <input type="text" name="searchBar" value={searchBar} onChange={(e) => setSearchBar(e.target.value)} />
                  <button type="button" onClick={(e) => setShowForm(false)}>
                    Valider</button>
                </form>
              )}


            </div>


            <Link href="/auth/login">
              <a>
                <HeaderItem title="LOGIN" Icon={LoginIcon} />
              </a>
            </Link>
          </div>
        </div>
      )}


      { userId != null && role == "user" && (
        <div className="flex flex-grow justify-evenly max-w-6xl">
          <div className="flex flex-grow justify-evenly max-w-6xl">

            <Link href="/">
              <a>
                <HeaderItem title="HOME" Icon={HomeIcon} />
              </a>
            </Link>

            <Link href="/search">
              <a>
                <HeaderItem title="SEARCH" Icon={SearchIcon} />
              </a>
            </Link>

            <Link href="/favorites/favorites">
              <a>
                <HeaderItem title="FAVORITES" Icon={HeartIcon} />
              </a>
            </Link>

            <Link href="/profile/lists">
              <a>
                <HeaderItem title="LISTS" Icon={ViewListIcon} />
              </a>
            </Link>

            <Link href="/profile/settings">
              <a>
                <HeaderItem title="PROFILE" Icon={UserIcon} />
              </a>
            </Link>
            <button onClick={logout} className="pb-6">
              <HeaderItem title="LOGOUT" Icon={LogoutIcon} />
            </button>
          </div>
        </div>
      )}



      {  role == "admin" && (
        <div className="flex flex-grow justify-evenly max-w-6xl">
          <div className="flex flex-grow justify-evenly max-w-6xl">

            <Link href="/">
              <a>
                <HeaderItem title="HOME" Icon={HomeIcon} />
              </a>
            </Link>

            <Link href="/search">
              <a>
                <HeaderItem title="SEARCH" Icon={SearchIcon} />
              </a>
            </Link>

            <Link href="/favorites/favorites">
              <a>
                <HeaderItem title="FAVORITES" Icon={HeartIcon} />
              </a>
            </Link>

            <Link href="/profile/lists">
              <a>
                <HeaderItem title="LISTS" Icon={ViewListIcon} />
              </a>
            </Link>

            <Link href="/profile/settings">
              <a>
                <HeaderItem title="PROFILE" Icon={UserIcon} />
              </a>
            </Link>
            <Link href="/administration/management_users">
              <a>
                <HeaderItem title="ADMIN" Icon={CogIcon} />
              </a>
            </Link>

            <Link href="/administration/movies">
              <a>
                <HeaderItem title="TMDB MOVIES" Icon={FilmIcon} />
              </a>
            </Link>
            <button onClick={logout} className="pb-6">
              <HeaderItem title="LOGOUT" Icon={LogoutIcon} />
            </button>
          </div>
        </div>
      )}







      <Image
        className="object-contain cursor-pointer"
        src="https://i.ibb.co/wKPgtVY/Rotten-Potatoes.png"
        width={200}
        height={100}
        onClick={back}
      />
    </header>
  );
}

export default Header;
