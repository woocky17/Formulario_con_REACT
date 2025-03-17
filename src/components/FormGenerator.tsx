import React from 'react'


export const FormGenerator = (form:any,key:any) => {


    return (
      <div>
        <h1>Hello, World!</h1>
      </div>
    );
  };
    

  return (
    <form key={key}>
      {formGen(form)}
    </form>

    )
}
