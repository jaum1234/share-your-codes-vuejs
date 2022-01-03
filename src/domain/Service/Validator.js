class Validator
{
    validate(componentFormErrors, responseErrors)
    {
        for (const responseError in responseErrors) {
            for (const error in componentFormErrors) {

                if (responseError == error) {
                    componentFormErrors[error] = responseErrors[responseError][0];
                }

                setTimeout(() => {
                    componentFormErrors[error] = '';
                }, 5000);
            }
        }
    }
}

const validator = new Validator();

export { validator };