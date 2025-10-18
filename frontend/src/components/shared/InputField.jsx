const InputField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder,
}) => {
    return (
        <div className="flex flex-col gap-4 lg:flex-row flex-wrap lg:space-x-4 space-y-4 lg:space-y-0">
            <label htmlFor={id} className="w-[40%] font-semibold text-dark-brown">
                {label}
            </label>
            <input
                className={`w-[60%] px-3 py-2 bg-dark-toffee rounded ${className}`}
                type={type}
                id={id}
                {...register(id, { 
                    required: required ? message : false, 
                    min: min,
                    pattern: type === 'email' ? {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address"
                    } : undefined 
                })}
                defaultValue={value}
                placeholder={placeholder}
            />
            {errors[id] && (
                <p className="text-red-500 text-sm w-full lg:pl-4">
                    {errors[id]?.message}
                </p>
            )}
        </div>
    )
}

export default InputField