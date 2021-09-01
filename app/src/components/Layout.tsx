import React, { Fragment, ReactNode, useContext, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { destroyCookie, parseCookies } from 'nookies'
import { UserCircleIcon } from '@heroicons/react/solid'
import router, { useRouter } from 'next/router'
import Image from 'next/image'
import { AuthContext } from '../contexts/AuthContext';
import Dropdown from './Dropdown'

type Props = {
  children?: ReactNode,
  title: string,
  anos: optionType[],
  diretorias: optionType [],
  gerencias: optionType []
}

type navigationType = {
  name: string,
  href?: string,
  current?: boolean,
  onclick?: VoidFunction
}

export type optionType = {
  ID: number,
  name: string,
  superior?: number
}

const navigation: navigationType[] = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]

const userNavigation: navigationType[] = [
  { name: 'Sign out', onclick: SignOut },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function SignOut() {
  destroyCookie(null, 'corollas.token', {
    path: '/'
  })
  router.push('/')
}

export default function Layout( { children, title, anos, diretorias, gerencias } : Props ) {

  useEffect(() => {
    const { 'corollas.token': token } = parseCookies()
    if (!token) {
      router.push('/')
    }
  }, [])

  const { user, isAuthenticated } = useContext(AuthContext)
  const router = useRouter()
  const { areaID, ano } = router.query

  let diretoria: string
  let gerencia: string
  let superior: number

  if (areaID == '1') {
    diretoria = '-todos-'
    gerencia = '-todos-'
  } else {
    try {
      diretoria = diretorias.find(el => el.ID == parseInt(areaID[0])).name
      gerencia = '-todos-'
      gerencias = gerencias.filter(el => el.superior == parseInt(areaID[0]) || el.superior == -1)
    } catch {
      gerencia = gerencias.find( el => el.ID == parseInt(areaID[0])).name
      superior = gerencias.find( el => el.ID == parseInt(areaID[0])).superior
      diretoria = diretorias.find( el => el.ID == superior).name
      gerencias = gerencias.filter(el => el.superior == superior || el.superior == -1)
    }
  }

  const isPermited: boolean = user?.areaID == 1 || user?.areaID == parseInt(areaID[0]) || user?.areaID == superior

  return (
    <>
      {isAuthenticated? (
        <>
          {isPermited? (
          <div>
            <Disclosure as="nav" className="bg-roxo_prati">
              {({ open }) => (
                <>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <Image src="/logo_prati_branco.svg" alt="Prati-Donaduzzi" width="110" height="38"/>
                          </div>
                          <div className="w-0.5 h-12 ml-4 mr-3 bg-white"></div>
                          <div className="text-white text-lg font-medium">
                            <h2 className="-mb-2">Perdas em</h2>
                            <h2 className="-mt-2">Corollas</h2>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-800 text-white font-medium'
                                    : 'text-white hover:bg-white hover:text-roxo_prati',
                                  'px-3 py-2 rounded-md text-sm font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          {/* Profile dropdown */}
                          <Menu as="div" className="ml-3 relative">
                            <div>
                              <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2">
                                <span className="sr-only">Open user menu</span>
                                <UserCircleIcon  className="h-7 w-7 text-roxo_prati" aria-hidden="true"/>
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <a
                                        href={item?.href}
                                        onClick={item.onclick}
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                      >
                                        {item.name}
                                      </a>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                          ) : (
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>

                  <Disclosure.Panel className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white hover:text-roxo_prati',
                            'block px-3 py-2 rounded-md text-base font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-700">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0 bg-white rounded-full">
                          <UserCircleIcon  className="h-7 w-7 text-roxo_prati" aria-hidden="true"/>
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">{user?.user}</div>
                          <div className="text-sm font-medium leading-none text-gray-400">{user?.email}</div>
                        </div>
                      </div>
                      <div className="mt-3 px-2 space-y-1">
                        {userNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={item.onclick}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">{ title }</h1>
              </div>
            </header>
            <main>
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                  <Dropdown title='ano' value= { ano } options = { anos }/>
                  <Dropdown title='diretoria' value= { diretoria } options = { diretorias }/>
                  <Dropdown title='gerência' value= { gerencia } superior= { superior } options = { gerencias }/>
                </div>
                <div className="px-4 py-4 sm:px-0">
                  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                    {children}
                  </div>
                </div>
              </div>
            </main>
          </div>
          ): (
            <div className="h-screen w-screen flex flex-col justify-center items-center font-sans">
              <div className="flex justify-center mr-8 ml-8">
                <h2 className="text-4xl font-extrabold text-indigo-600">401</h2>
                <div className="ml-4 mr-4 w-0.5 h-14 bg-gray-200"></div>
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-800">Forbidden</h2>
                  <span className="text-gray-400">You don't have permission to access this page</span>
                </div>
              </div>
              <div className="inline-flex rounded-md shadow m-4">
                <a
                  onClick={() => {                     
                    router.push('/', undefined, { shallow: true })
                  }}
                  className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm rounded-md text-gray-200 bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                >
                  Go back home
                </a>
              </div>
            </div>
          )
          }
        </>
      ): (
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-28 w-28 border-b-4 border-roxo_prati"></div>
        </div>
      )}
    </>
  )
}