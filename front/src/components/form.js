import React, { memo, useCallback } from 'react'


// Create the Field component:
const Field = memo((props) => {
    // Create handler for change event:
    const onFieldChange = useCallback(
      (event) => {
        props.onFieldChange(props.fieldName, event.target.value)
      },
      [props.onFieldChange, props.fieldName]
    )
  
    // Render all HTML components:
    return (
      <fieldset className='flex flex-col'>
        <label className='text-xs font-serif mt-4' htmlFor={props.fieldName}>{props.labelText}</label>
  
        <input className='bg-gray-100 p-2 rounded border-none outline-none '
          type={props.fieldType}
          name={props.fieldName}
          id={props.fieldName}
          onChange={onFieldChange}
          value={props.fieldValue}
        />
  
        {props.hasError && (
          <p  className='text-xs font-serif text-red-200'>{`Please fill in correct value for "${props.labelText}".`}</p>
        )}
      </fieldset>
    )
  })
 
  // form component
  const AddUserForm = memo((props) => (
    <form onSubmit={props.onSubmit} noValidate>
        <Field
            labelText="Full Name"
            fieldType="text"
            fieldName="name"
            fieldValue={props.values.name}
            hasError={props.errors.name}
            onFieldChange={props.onFieldChange}
        />

        <Field
            labelText="Email"
            fieldType="email"
            fieldName="email"
            fieldValue={props.values.email}
            hasError={props.errors.email}
            onFieldChange={props.onFieldChange}
        />

        <Field
            labelText="Password (+8 characters)"
            fieldType="password"
            fieldName="password"
            fieldValue={props.values.password}
            hasError={props.errors.password}
            onFieldChange={props.onFieldChange}
        />

        <Field
            labelText="User Type"
            fieldType="text"
            fieldName="usertype"
            fieldValue={props.values.usertype}
            hasError={props.errors.usertype}
            onFieldChange={props.onFieldChange}
        />

        <button type="submit" className="inline-flex mt-2 justify-center rounded border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Add User</button>
    </form>
    ))

    
    export {AddUserForm, Field}