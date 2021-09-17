/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { UrlObject } from 'url'
import { optionType } from './Layout';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type dropdownType = {
	title: string,
  value: string | string[],
  superior?: number,
	options: optionType []
}

export default function Dropdown({title, value, superior, options}: dropdownType) {
	const router = useRouter()
  const { areaID, ano } = router.query

  return (
    <Menu as="div" className="relative inline-block text-left mr-4 pt-4">
      <div className="flex position: relative">
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          { value }
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        <div className="position: absolute bg-white -mt-2.5 ml-2.5 pl-1 pr-1 rounded-full text-xs text-gray-400 pointer-events-none"> { title } </div>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-10"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute mt-1 min-w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer z-50">
          <div className="py-1 max-h-80 overflow-y-auto">
						{options.map((item) => (
							<Menu.Item key={item.ID}>
								{({ active }) => (
									<a
										onClick={() => {                     
                      let url: string | UrlObject
                      if (title === 'ano') {
                        url = {
                          pathname: router.pathname,
                          query: { areaID: areaID, ano: item.ID},
                        }
                      } else if (item.ID == -1) {
                        url = {
                          pathname: router.pathname,
                          query: { areaID: superior, ano: ano},
                        }
                      } else {
                        url = {
                          pathname: router.pathname,
                          query: { areaID: item.ID, ano: ano},
                        }
                      }
											router.push(url, undefined, { shallow: true })
										}}
										className={classNames(
											active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
											'block px-4 py-2 text-sm'
										)}
									>
										{item.name}
									</a>
								)}
							</Menu.Item>
						))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}