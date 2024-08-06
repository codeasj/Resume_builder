/* eslint-disable react/prop-types */

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50">
      <div
        className="bg-gray-800/70 fixed top-0 left-0 w-full h-screen animate-pulse z-40"
        onClick={(ev) => {
          if (ev.currentTarget === ev.target) onClose();
        }}
      ></div>
      <div className="h-auto  min-w-[450px] rounded-xl bg-[#fff] p-10 px-5 text-black shadow-md animate-[ping_0.5s_ease-in-out_1_reverse] z-50">
        {children}
      </div>
    </div>
  );
};

export default Modal;
