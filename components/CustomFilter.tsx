'use client';

import { CustomFilterProps } from '@/types';
import { useState, Fragment } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Listbox, Transition } from '@headlessui/react';
import { updateSearchParams } from '@/utils';
import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import path from 'path';

const CustomFilter = ({ title, options, setIsLoading, selectedFilter, setSelectedFilter }: CustomFilterProps) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const currentValue = searchParams.get(title);

  const currentOption = options.find((opt) => opt.value.toLowerCase() === `${currentValue}`) || options[0];

  const [selected, setSelected] = useState(currentOption);

  const handleUpdateParams = (e: { title: string; value: string }) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase());

    if (newPathName !== pathName) {
      setIsLoading(true);
      router.push(newPathName, { scroll: false });
    }
  };

  return (
    <div className={`w-fit ${selectedFilter === title ? 'z-50' : ''}`} onClick={setSelectedFilter}>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdateParams(e);
        }}
      >
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom-filter__btn !cursor-pointer">
            <span className="block truncate">{selected.title}</span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="chevron up down"
            />
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="custom-filter__options z-40">
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 px-4 ${
                      active ? 'bg-primary-blue text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{option.title}</span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
