import "../../App.css";
import Select from 'react-select';

const ClassicInput = (props) => {
  const onChangeInput = (e) => {
    const input = e.target.value;
    props.onChange(input);
  };
  return (
    <>        
        <div className="form-group">
            <label htmlFor={props.htmlFor} className="sr-only">
            {props.placeholder}
            </label>
            <input
            type={props.type}
            id={props.id}
            name={props.id}
            autoComplete={props.autoComplete}
            className="relative bg-transparent h-12 block w-full rounded-xl  mb-2 md:mb-4 border border-gray-300 px-6 py-2 text-gray-900 placeholder-gray-600 focus:z-10 font-Pop-R tracking-[0.5px] text-[12pt] focus:outline-none greenBorderWhenFocus form-control"
            placeholder={props.placeholder}
            validations={props.validations}
            onChange={onChangeInput}
            /> 
            
        </div>           
    </>
  )
}

const BoxInput = (props) => {
  const onChangeInput = (e) => {
    const input = e.target.value;
    props.onChange(input);
  };
  return (
    <>        
        <input
          type="text"
          className="rounded-md font-Pop-R text-sm md:text-xs border-transparent focus:border-transparent focus:ring-0"
          value={props.value}
          onChange={onChangeInput}
          placeholder={props.placeholder}
        />
        
    </>
  )
}

const BottomLineInput = (props) => {
  const onChangeInput = (e) => {
    const input = e.target.value;
    props.onChange(input);
  };
  return (
    <>        
        <input
          type="text"
          className= "mt-1 basis-2/5 font-Pop-R text-sm md:text-xs border-2 text-gray-500 border-t-transparent border-l-transparent border-r-transparent focus:ring-0 focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent border-b-[#E1EAD7] focus:border-b-[#E1EAD7]"
          value={props.value}
          onChange={onChangeInput}
          placeholder={props.placeholder}
        />
        
    </>
  )
}

const BottomLineNumberInput = (props) => {
  const onChangeInput = (e) => {
    const input = e.target.value;
    props.onChange(input);
  };
  return (
    <>        
        <input
          type="number"
          className= "mt-1 w-full col-span-2 font-Pop-R text-sm md:text-xs border-2 text-gray-500 border-t-transparent border-l-transparent border-r-transparent focus:ring-0 focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent border-b-[#E1EAD7] focus:border-b-[#E1EAD7]"
          value={props.value}
          onChange={onChangeInput}
          placeholder={props.placeholder}
        />
        
    </>
  )
}

const stylesForSelect = {
  control: (base, state) => ({
    ...base,
    background: "white",
    backgroundColor: "white",
    '&:hover': { 
          border: 'transparent', 
          borderBottom: '2px solid #E1EAD7', }, 

          border: 'transparent', 
          borderBottom: '2px solid #E1EAD7',
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
    padding: 10,
    cursor: isDisabled ? 'not-allowed' : 'default',
    
    };
  },
  placeholder: (styles) => ({ ...styles}),
  singleValue:(styles, { data }) => ({
    ...styles,
    color: "#6c3333",
    padding: 10,
  }),
};

const SelectInput = (props) => {
  return (
    <>        
    <Select className="md:basis-1/2 text-sm md:text-xs border-gray-300 relative bg-transparent h-auto w-full placeholder-gray-600 focus:z-10 font-Pop-R focus:outline-none greenBorderWhenFocus form-control" styles={stylesForSelect} 
              options={props.options}
              value={props.value} 
              placeholder={props.placeholder}
              onChange={props.onChange}
              isSearchable={false}/>
        
    </>
  )
}

const BottomLineDateInput = (props) => {
  const onChangeInput = (e) => {
    const input = e.target.value;
    props.onChange(input);
  };
  return (
    <>  { (props.max && props.min) ?   
        <input
          max={props.max}
          min={props.min}
          onChange={onChangeInput}
          type="date"
          value={props.value}
          className="mt-1 font-Pop-R col-span-2 text-sm md:text-xs border-2 text-gray-500 border-t-transparent border-l-transparent border-r-transparent focus:ring-0 focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent border-b-[#E1EAD7] focus:border-b-[#E1EAD7]"
          />
          :
            ((props.min) ?
            <input
            min={props.min}
            onChange={onChangeInput}
            type="date"
            value={props.value}
            className="mt-1 font-Pop-R col-span-2 text-sm md:text-xs border-2 text-gray-500 border-t-transparent border-l-transparent border-r-transparent focus:ring-0 focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent border-b-[#E1EAD7] focus:border-b-[#E1EAD7]"
            />
            :
              ((props.max)?
              <input
              max={props.max}
              onChange={onChangeInput}
              type="date"
              value={props.value}
              className="mt-1 font-Pop-R col-span-2 text-sm md:text-xs border-2 text-gray-500 border-t-transparent border-l-transparent border-r-transparent focus:ring-0 focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent border-b-[#E1EAD7] focus:border-b-[#E1EAD7]"
              />
              :
              <input
                onChange={onChangeInput}
                type="date"
                value={props.value}
                className="mt-1 font-Pop-R col-span-2 text-sm md:text-xs border-2 text-gray-500 border-t-transparent border-l-transparent border-r-transparent focus:ring-0 focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent border-b-[#E1EAD7] focus:border-b-[#E1EAD7]"
                />)
            )
    }
    </>
  )
}

const Inputs = {
  ClassicInput,
  BoxInput,
  SelectInput,
  BottomLineInput,
  BottomLineDateInput,
  BottomLineNumberInput
}
export default Inputs;