export const categories = [
  { id: 'chest', name: 'Chest', description: 'Conventional chest radiography', icon: 'C', accent: 'orange' },
  { id: 'abdomen', name: 'Abdomen', description: 'Abdominal radiography', icon: 'A', accent: 'grey' },
  { id: 'upper-limb', name: 'Upper Limb', description: 'Hand, wrist, elbow and arm', icon: 'U', accent: 'grey' },
  { id: 'lower-limb', name: 'Lower Limb', description: 'Foot, ankle, knee and leg', icon: 'L', accent: 'grey' },
  { id: 'shoulder-girdle', name: 'Shoulder Girdle', description: 'Shoulder and clavicle', icon: 'S', accent: 'grey' },
  { id: 'pelvis-hip', name: 'Pelvis & Hip', description: 'Pelvic ring and hip', icon: 'P', accent: 'grey' },
  { id: 'vertebral-column', name: 'Vertebral Column', description: 'Spine projections', icon: 'V', accent: 'grey' },
  { id: 'skull-facial-bones', name: 'Skull & Facial Bones', description: 'Cranium and facial bones', icon: 'K', accent: 'grey' },
  { id: 'other', name: 'Other Conventional Projections', description: 'Additional conventional studies', icon: '+', accent: 'grey' },
]

const chestProjectionNames = [
  ['pa-chest', 'PA Chest', ['posteroanterior chest', 'chest PA']],
  ['ap-chest', 'AP Chest', ['anteroposterior chest', 'chest AP']],
  ['lateral-chest', 'Lateral Chest', ['lateral projection chest', 'chest lateral']],
  ['ap-supine-chest', 'AP Supine Chest', ['supine chest', 'portable AP chest']],
  ['ap-semi-erect-chest', 'AP Semi-erect Chest', ['semi-erect chest', 'semierect chest']],
  ['right-lateral-decubitus-chest', 'Right Lateral Decubitus Chest', ['right decubitus chest', 'right side down chest']],
  ['left-lateral-decubitus-chest', 'Left Lateral Decubitus Chest', ['left decubitus chest', 'left side down chest']],
  ['apical-lordotic-chest', 'Apical Lordotic Chest', ['lordotic chest', 'apices chest']],
  ['expiratory-chest', 'Expiratory Chest', ['expiration chest', 'expiratory view']],
]

function needsVerification(label) {
  return `Needs clinical verification: add approved ${label} after review against the department protocol and an appropriate radiography reference.`
}

function createChestProjection([id, name, aliases]) {
  return {
    id,
    categoryId: 'chest',
    name,
    aliases,
    purpose: 'Reference entry for this conventional chest projection. Clinical purpose and scope must be confirmed before publication.',
    indications: needsVerification('clinical indications'),
    preparation: needsVerification('patient preparation guidance'),
    patientPositioning: needsVerification('patient positioning instructions'),
    partPositioning: needsVerification('part positioning instructions'),
    centralRay: needsVerification('central ray direction, angle, and centering point'),
    sidDetector: needsVerification('SID and detector considerations'),
    collimationExposure: needsVerification('collimation and exposure considerations'),
    breathing: needsVerification('breathing instructions'),
    characteristics: [
      needsVerification('essential image characteristics'),
      'Do not use this entry as a clinical authority until the verification status is updated.',
    ],
    faults: [{ fault: 'Fault list not yet verified', effect: needsVerification('the effect of each fault'), remedy: needsVerification('faults and remedies') }],
    references: ['Reference placeholder: add the approved textbook, local protocol, or professional guideline citation.'],
    verification: 'Needs clinical verification',
    verificationTone: 'warning',
  }
}

const paChestEducation = {
  purpose: 'The PA chest is a routine erect chest projection used to demonstrate the lungs, pleura, heart, mediastinum, and bony thorax. With the patient upright and the chest close to the image receptor, it generally reduces cardiac magnification compared with an AP chest. The exact examination and views should follow the request, patient condition, and departmental protocol.',
  indications: 'Common indications include assessment of suspected cardiopulmonary disease, respiratory symptoms, chest pain or fever, follow-up of known thoracic findings, and selected pre-procedure or occupational examinations. The requesting clinician and local protocol determine whether a chest examination is appropriate and which views are required.',
  preparation: 'Confirm patient identity, examination request, relevant symptoms and pregnancy status according to local policy. Explain the examination and breathing instruction in plain language. Remove clothing, jewellery, ECG leads, monitoring cables, and other objects over the chest where practical; preserve essential clinical equipment and document limitations. Provide privacy and a gown as required.',
  patientPositioning: 'Use an erect stance when the patient can safely stand. Position the patient facing the image receptor with the anterior chest against it. Adjust the receptor height so the required lung fields can be included. If the patient cannot stand, an erect seated arrangement may be used when clinically appropriate; document the modification and follow the local protocol.',
  partPositioning: 'Place the midline of the thorax perpendicular to and centred to the receptor. Ask the patient to roll the shoulders forward and place the backs of the hands or forearms against the sides of the receptor as appropriate; this helps move the scapulae laterally from the lung fields. Elevate the chin so it does not project over the apices. Check that the shoulders are at equal distances from the receptor and that the patient is not rotated. These are standard general teaching points; compare the exact hand, shoulder, chin, and receptor instructions with Clark\'s Positioning in Radiography, 13th edition when that text is available for review.',
  centralRay: 'For a standard PA chest, use a perpendicular central ray directed to the mid-thorax at the level specified by the department protocol, commonly described in general radiography teaching as the level of approximately T7 with the patient in the erect position. Confirm the exact centring landmark and any receptor-height convention against the local protocol and Clark\'s 13th edition; this record has not been checked against that edition.',
  sidDetector: 'Use the department\'s approved long-distance chest technique and a detector large enough to include both lungs and the relevant costophrenic angles. A commonly taught general arrangement uses a long SID to reduce geometric magnification, but the exact SID, detector size, grid or air-gap method, and detector orientation are equipment- and protocol-dependent. Confirm these values before clinical use and compare edition-specific details with Clark\'s 13th edition.',
  collimationExposure: 'Collimate to include the entire lung fields, apices, lateral soft tissues, and costophrenic angles while avoiding unnecessary exposure outside the area of interest. Use the department\'s approved automatic exposure control or exposure technique and apply exposure-index monitoring according to local practice. The exposure should show lung markings and mediastinal detail without avoidable quantum mottle or excessive penetration. Do not copy technique factors from this educational record without local verification; compare any Clark-specific technique guidance separately.',
  breathing: 'Instruct the patient to take a deep breath in, hold it, and remain still while the exposure is made. A full inspiration increases the amount of aerated lung displayed and helps lower the diaphragm, improving assessment of the lungs and costophrenic angles. Give the instruction before exposure and confirm that the patient understands it; adapt it for the patient\'s ability and clinical condition.',
  characteristics: [
    'Both lungs are included from the apices through the costophrenic angles, with the lateral chest margins included where clinically required.',
    'The image is made on full inspiration, with the diaphragm positioned low enough for the department\'s approved image-criteria standard.',
    'The thorax is not rotated: the medial ends of the clavicles are approximately equidistant from the vertebral column, subject to patient anatomy.',
    'The scapulae are projected as far as practical outside the lung fields, without obscuring required anatomy.',
    'The clavicles and upper thorax are included, and the apices are not clipped by the receptor or collimation.',
    'Exposure is sufficient to demonstrate pulmonary vascular markings and relevant retrocardiac and mediastinal detail without unacceptable noise or saturation.',
  ],
  faults: [
    { fault: 'Patient rotation', effect: 'Unequal appearance of the lungs and hila can mimic asymmetry and may obscure or distort mediastinal assessment.', remedy: 'Before exposure, compare the distance from each medial clavicle to the spinous processes and reposition the patient so the thorax is straight and centred.' },
    { fault: 'Shoulders not rolled forward', effect: 'Scapulae project over the lateral lung fields and can obscure pulmonary detail.', remedy: 'Ask the patient to roll both shoulders forward and keep the chest against the receptor; adapt the instruction for pain or limited mobility.' },
    { fault: 'Chin or hair over the apices', effect: 'Apical lung detail may be obscured.', remedy: 'Raise the chin and move hair or other removable material away from the upper chest before exposure.' },
    { fault: 'Inadequate inspiration', effect: 'Crowded lung markings and elevated diaphragms may reduce diagnostic visibility and can simulate lower-lung opacity.', remedy: 'Explain and rehearse the breathing instruction, allow the patient to take a preparatory breath, and repeat only when clinically justified and permitted by protocol.' },
    { fault: 'Poor collimation or clipped anatomy', effect: 'Unnecessary dose may be given, or an apex, lateral lung margin, or costophrenic angle may be excluded.', remedy: 'Set the receptor height and collimation after checking the patient\'s anatomy and the required field of view; repeat only if the missing anatomy is clinically important.' },
  ],
  references: [
    'General guidance in this record is based on commonly taught PA chest positioning principles and is not a substitute for supervised clinical practice.',
    'Clark\'s Positioning in Radiography, 13th edition: edition-specific landmarks, technique details, and image-criteria wording still require direct comparison. This application has not consulted or reproduced that edition.',
    'Add the approved local departmental protocol and any current professional or equipment guidance used for verification.',
  ],
  verification: 'Needs clinical verification',
  verificationTone: 'warning',
}

export const projections = chestProjectionNames.map(createChestProjection).map((projection) => projection.id === 'pa-chest' ? { ...projection, ...paChestEducation } : projection)

export function getCategory(id) {
  return categories.find((category) => category.id === id)
}

export function getProjection(id) {
  return projections.find((projection) => projection.id === id)
}
