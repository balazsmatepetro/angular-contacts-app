import ContactPresenter from '../core/contact-presenter.entity';

/**
 * Makes a HTTP request and fetches all contact entries. After the response has arrived 
 * wraps all contact entries to a decorator object and returns collection of them.
 * 
 * @export
 * @param {ContactService} contactService The contact service instance.
 * @returns {Array.<ContactPresenter>}
 */
export default function contactListResolver(contactService) {
    // We have to fetch all contact entries.
    return contactService.findAll().then((contacts) => {
        // After that we're wrapping them into presenter instances.
        return contacts.map((contact) => new ContactPresenter(contact));
    });
}
