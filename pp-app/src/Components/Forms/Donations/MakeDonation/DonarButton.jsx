const DonarButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className='uppercase w-1/2 bg-orange-400 text-white h-10 font-bold shadow-md'>
      Donar
    </button>
  )
}

export default DonarButton