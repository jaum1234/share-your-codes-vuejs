class ValidationErrors 
{
    
    validate(componentFormErrors, responseErrors)
    {
        const componentErrorKeys = Object.keys(componentFormErrors);
        const responseErrorKeys = Object.keys(responseErrors);
                    
        componentErrorKeys.forEach(componentError => {
            responseErrorKeys.forEach(responseError => {
                if (componentError == responseError) {
                    componentFormErrors[componentError] = responseErrors[responseError][0];
                }
            });
        });
    }
}

const validator = new ValidationErrors();

export { validator };