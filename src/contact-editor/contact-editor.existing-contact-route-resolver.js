/**
 * Returns the Contact instance if it can be located, else redirects to the 'contacts' route.
 * 
 * @export
 * @param {Object} $state The $state service.
 * @param {Object} $stateParams The $stateParams service.
 * @param {Object} contactService The contact service.
 * @returns {Promise<Contact>}
 */
export default function existingContactResolver($state, $stateParams, contactService) {
    return contactService.findById($stateParams.id).catch(() => $state.go('contacts'));
}
