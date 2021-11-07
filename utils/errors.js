function handleError(err, req, res, next) {
    /*
    Next służy do wywołania kolejnego middleware.u nas możemy usunąć.
    To jest funkcja następnego middleware.
    */
    console.log(err); //Na backendzie chcemy znać ten błąd

    if (err instanceof NotFoundError) {
        res
            .status(404)
            .render('error', {
                message: `Nie można znależć elementu o danym ID`,
            })
        return;
    }
    res.status(err instanceof ValidationError ? 400 : 500); 

    res.render('error', {
        message: err instanceof ValidationError ? err.message : "Błąd aplikacji",
        // Powyższe podniesie bezp, bo nie wywali na widok błędów prog mogących
        // dostarczać danych o aplikacji. 
    })
}

/* Poniższe robimy, abyśmy wychwytywali na froncie tylko błędy nieprogramistyczne*/
class ValidationError extends Error {} 
class NotFoundError extends Error {} 

module.exports = {
    handleError,
    ValidationError,
    NotFoundError,
}