/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { UrlObject } from 'url'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type dropdownType = {
	title: string,
	options: optionsType []
}

type optionsType = {
	name: string,
	value: string
}

export default function Dropdown({title, options}: dropdownType) {
	const router = useRouter()
  const { areaID, ano } = router.query
  return (
    <Menu as="div" className="relative inline-block text-left mr-4 pt-2">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          { title }
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute mt-1 min-w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
						{options.map((item) => (
							<Menu.Item key={item.name}>
								{({ active }) => (
									<a
										onClick={() => {
                      let url: string | UrlObject
                      if (title === 'ano') {
                        url = {
                          pathname: router.pathname,
                          query: { areaID: areaID, ano: item.value},
                        }
                      } else {
                        url = {
                          pathname: router.pathname,
                          query: { areaID: item.value, ano: ano},
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