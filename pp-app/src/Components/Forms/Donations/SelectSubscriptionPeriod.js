import subscriptionPeriod from "../../../Values/subscriptionPeriod";
import { useSubscriptionPeriod } from "../../../Context/SubscriptionContext";
import Select from 'react-select';

const SelectSubscriptionPeriod = ( ) => {
  const { subsPeriod, setSubsPeriod} = useSubscriptionPeriod()
  const onChangeSubsPeriod = (e) => {
    setSubsPeriod(e);
  };
 
  const colourStyles = {
    control: (base, state) => ({
      ...base,
      background: "white",
      backgroundColor: "white",
      '&:hover': { borderColor: '#e7e6e6' }, 
            border: '1px solid #e7e6e6', 
            boxShadow: 'none', 
  }),
    option: (styles, { data, isDisabled, isFocused, isSelected}) => {
      return {
        ...styles,
        color: isSelected ? "#eb8301" : 'gray',
      backgroundColor: isDisabled
        ? "white"
        : isSelected
        ? "#f5f8f2"
        : isFocused
        ? "#f5f8f2"
        : "white",
      padding: 8,
      cursor: isDisabled ? 'not-allowed' : 'default',
      
      };
    },
    placeholder: (styles) => ({ ...styles}),
    singleValue:(styles, { data }) => ({
      ...styles,
      color: "#6c3333",
      padding: 6,
      borders: "red",
    }),
  };
  
    return (
      <div className="space-y-4">
      <div className="font-Pop-R text-xs text-gray-500 tracking-widest">¿Cada cuanto desea donar?</div>
        <div className="flex flex-row">
          <Select className="md:basis-1/2 border-gray-300 relative bg-transparent h-auto w-full placeholder-gray-600 focus:z-10 font-Pop-SB tracking-widest text-xs focus:outline-none greenBorderWhenFocus form-control" styles={colourStyles} 
                        options={subscriptionPeriod}
                        value={subsPeriod} 
                        placeholder="Seleccione la frecuencia de pago"
                        onChange={onChangeSubsPeriod}
                        isSearchable={false}/>
        </div>
      </div>
    )
  }
  
  export default SelectSubscriptionPeriod