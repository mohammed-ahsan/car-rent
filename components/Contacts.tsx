'use client';

import { CarProps } from '@/types';

import Image from 'next/image';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { generateCarImageUrl } from '@/utils';

import { CustomButton, Alert } from '@/components';

const Contacts = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAlert();
    closeModal();
  };

  const [isOpenContacts, setIsOpenContacts] = useState(false);
  const [phone, setPhone] = useState('');
  const [alert, setAlert] = useState('');

  const closeModal = () => setIsOpenContacts(false);

  const handleAlert = () => {
    setAlert('We will contact you soon!');
    setTimeout(() => {
      setAlert('');
    }, 3000);
  };

  const handlePhoneChange = (event: React.SyntheticEvent): void => {
    let target = event.target as HTMLInputElement;
    const inputValue = target.value;

    const numericValue = inputValue.replace(/\D/g, '');

    const formattedValue = numericValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

    setPhone(formattedValue);
  };

  return (
    <>
      <Alert title={alert} />

      <CustomButton
        title="Contact Us"
        btnType="button"
        containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
        handleClick={() => setIsOpenContacts(true)}
      />
      <Transition appear show={isOpenContacts} as={Fragment}>
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
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white text-left shadow-xl transition-all flex flex-col gap-10 p-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                  >
                    <Image src="close.svg" alt="close" width={20} height={20} className="object-contain" />
                  </button>

                  <div className="relative w-full">
                    <p className="text-xl font-bold ">Contact Us</p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-5">
                    <div className="flex justify-between gap-5 w-full text-right">
                      <h4 className="text-grey capitalize">Phone:</h4>
                      <a className="contact-link" href="tel:+XXX-XXX-XXXX">
                        000-000-0000
                      </a>
                    </div>
                    <div className="flex justify-between gap-5 w-full text-right">
                      <h4 className="text-grey capitalize">Email:</h4>
                      <a href="mailto:carrent@email.com" className="contact-link">
                        carrent@email.com
                      </a>
                    </div>
                    <div className="flex justify-between gap-5 w-full text-right">
                      <h4 className="text-grey capitalize">Facebook</h4>
                      <a href="https://www.facebook.com/carrent" target="_blank" className="contact-link">
                        fb@carrent
                      </a>
                    </div>
                  </div>

                  <form className="searchbar flex-col gap-5" onSubmit={handleSubmit}>
                    <p className="text-lg text-bold">Or leave your Phone Number:</p>
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
                      title="Let us call you"
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

export default Contacts;
