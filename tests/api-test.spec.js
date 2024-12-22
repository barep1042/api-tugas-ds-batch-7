const{test, expect}=require('@playwright/test');
const{Ajv}=require('ajv');

const ajv=new Ajv();

test('Test GET SINGLE RESOURCE', async ({ request }) => {
    const response=await request.get('https://reqres.in/api/unknown/2');
    expect(response.status()).toBe(200);
    
    const responseData=await response.json();
    expect(responseData.data.id).toBe(2);
    expect(responseData.data.name).toBe("fuchsia rose");
    
    const valid=ajv.validate(require('./json-schema/get-schema.json'), responseData);

    if(!valid){
        console.error("AJV Validation Errors:", ajv.errorsText())
    }
    expect(valid).toBe(true);

    console.log(response.status());
    console.log(await response.json());
    
});


test('Test POST CREATE', async ({ request }) => {
    const bodyData={
        "name": "barep",
        "job": "pengangguran"
    }

    const headerData={
        Accept:'application/json'
    }

    const response=await request.post('https://reqres.in/api/users',{
        headers:headerData,
        data:bodyData
    });
    expect(response.status()).toBe(201);

    const responseData=await response.json();
    expect(responseData.name).toBe("barep");
    expect(responseData.job).toBe("pengangguran");

    const valid=ajv.validate(require('./json-schema/post-schema.json'), responseData);
        
    if(!valid){
        console.error("AJV Validation Errors:", ajv.errorsText())
    }
    expect(valid).toBe(true);    

    console.log(response.status());
    console.log(await response.json());
    
});


test('Test PUT UPDATE', async ({ request }) => {
    const bodyData={
        "name": "barep",
        "job": "qa engineer"
    }

    const headerData={
        Accept:'application/json'
    }

    const response=await request.put('https://reqres.in/api/users/2',{
        headers:headerData,
        data:bodyData
    });
    expect(response.status()).toBe(200);

    const responseData=await response.json();
    expect(responseData.name).toBe("barep");
    expect(responseData.job).toBe("qa engineer");

    const valid=ajv.validate(require('./json-schema/put-schema.json'), responseData);
        
    if(!valid){
        console.error("AJV Validation Errors:", ajv.errorsText());
    }
    expect(valid).toBe(true);    

    console.log(response.status());
    console.log(await response.json());
    
});


test('Test DELETE', async ({ request }) => {
    const response=await request.delete('https://reqres.in/api/users/2');
    expect(response.status()).toBe(204);

    // const responseData=await response.json();
    // expect(responseData.name).toBe();

    // const valid=ajv.validate(require('./json-schema/delete-schema.json'), responseData);

    // if(!valid){
    //     console.error("AJV Validation Errors:", ajv.errorsText());
    // }
    // expect(valid).toBe(true); //maaf mas saya stuck hehe

    console.log(response.status());
    console.log(await response);

});