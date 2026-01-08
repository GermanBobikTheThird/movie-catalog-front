import './UI.css';

const Select = ({ options = [], ...props }) => {
    return (
        <select className="ui-select" {...props}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;