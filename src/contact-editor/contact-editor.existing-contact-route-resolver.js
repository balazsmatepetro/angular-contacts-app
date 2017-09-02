export default function existingContactResolver($stateParams, contactService) {
    return contactService.findById($stateParams.id);
}
