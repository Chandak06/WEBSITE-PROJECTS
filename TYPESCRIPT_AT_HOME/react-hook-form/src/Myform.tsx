import {useForm,type SubmitHandler} from "react-hook-form";


interface FormData{
    firstName: string;
  lastName: string;
  email: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  completeLocation: string;
}

const Myform:React.FC = () => {
    const{
        register,
        handleSubmit,
        formState:{errors},
    }=useForm<FormData>();

const onSubmit:SubmitHandler<FormData>=(data)=>{
    console.log(data);
}
  return (
    <div className="container max-w-[600px] mx-auto p-5 border border-gray-300 rounded-lg">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" {...register("firstName",{required:"First Name is Required"})}/>
            {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>

        <div className="mb-4">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" {...register("lastName",{required:"Last Name is Required"})}/>
            {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
         <div className="mb-4">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email Address is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && <p>{errors.city.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="state">State</label>
          <input
            id="state"
            type="text"
            {...register("state", { required: "State is required" })}
          />
          {errors.state && <p>{errors.state.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="zip">ZIP</label>
          <input
            id="zip"
            type="text"
            {...register("zip", { required: "ZIP is required" })}
          />
          {errors.zip && <p>{errors.zip.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            type="text"
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && <p>{errors.country.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="completeLocation">Complete Location</label>
          <textarea
            id="completeLocation"
            {...register("completeLocation", {
              required: "Complete Location is required",
            })}
          />
          {errors.completeLocation && <p>{errors.completeLocation.message}</p>}
        </div>

            <button type="submit">Submit</button>

        </form>
    </div>
  )
}

export default Myform