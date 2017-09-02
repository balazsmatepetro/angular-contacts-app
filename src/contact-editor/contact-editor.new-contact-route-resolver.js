import Contact from '../core/contact.entity';

export default function newContactResolver($q) {
    const DEFERRED = $q.defer();

    DEFERRED.resolve(new Contact(undefined, '', '', []));

    return DEFERRED.promise;
}
