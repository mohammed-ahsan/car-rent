'use client';

import { CarProps } from '@/types';

import Image from 'next/image';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { generateCarImageUrl } from '@/utils';

import { CustomButton } from '@/components';

interface CarDetailsProps {
  isOpenBook: boolean;
  closeModal: () => void;
  car: CarProps;
  handleAlert: () => void;
  carRent: string;
}

const CarBook = ({ isOpenBook, closeModal, car, handleAlert, carRent }: CarDetailsProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAlert();
    closeModal();
  };

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (event: React.SyntheticEvent): void => {
    let target = event.target as HTMLInputElement;
    const inputValue = target.value;

    const numericValue = inputValue.replace(/\D/g, '');

    const formattedValue = numericValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

    setPhone(formattedValue);
  };

  return (
    <>
      <Transition appear show={isOpenBook} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80"></div>
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white text-left shadow-xl transition-all flex flex-col gap-7 p-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                  >
                    <Image src="close.svg" alt="close" width={20} height={20} className="object-contain top-[14px]" />
                  </button>

                  <div className="flex-1 flex flex-col gap-3">
                    <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                      <Image src={generateCarImageUrl(car)} alt="car model" fill priority className="object-contain" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-semibold text-xl capitalize">
                      {car.make} {car.model} — <span className="font-normal text-sm align-top">$</span>
                      {carRent}
                      <span className="font-normal text-sm align-bottom">/day</span>
                    </h2>
                  </div>

                  <form className="searchbar flex-col gap-7" onSubmit={handleSubmit}>
                    <div className="searchbar__item w-full">
                      <Image
                        src="/person-icon.png"
                        alt="model icon"
                        width={25}
                        height={25}
                        className="absolute w-[20px] h-[20px] ml-4 top-[14px]"
                      />
                      <input
                        type="text"
                        maxLength={30}
                        required
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="searchbar__input"
                      />
                    </div>
                    <div className="searchbar__item w-full">
                      <Image
                        src="/phone-icon.png"
                        alt="model icon"
                        width={25}
                        height={25}
                        className="absolute w-[20px] h-[20px] ml-4 top-[14px]"
                      />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        maxLength={12}
                        required
                        value={phone}
                        onChange={(e) => handlePhoneChange(e)}
                        placeholder="Phone Number (XXX-XXX-XXXX)"
                        className="searchbar__input"
                      />
                    </div>
                    <CustomButton
                      title="Book The Car"
                      btnType="submit"
                      containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                      textStyles="text-white text-[14px] leading-[17px] font-bold"
                      rightIcon="/right-arrow.svg"
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarBook;
