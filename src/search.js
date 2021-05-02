import React from "react";
import {useForm} from "react-hook-form";

export default function Search() {
    const { register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("exampleRequired", {required: true})} />
            {errors.exampleRequired && <span>Search for something!</span>}
            <input type="submit"/>
        </form>
    );


}