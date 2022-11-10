import { useAmount } from  '../../../Context/AmountContext'
import AmountButton from "./AmountButton"

const Amounts = (props) => {
  const { amounts, amountIndex } = useAmount()
  return (
    <>
      <div className="container flex flex-col space-y-3">
        {props.customAmountInput}
        { props.showOptions ?
        <div className="container grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 ">
          {amounts.map((amount, index) => {
            return (<AmountButton key={index} amount={amount} selected={index === amountIndex()}/>)
          })}
        </div>
        :
        null
        }
      </div>
    </>
  )
}

export default Amounts
