/*
 * SuperBright photography direction (duck-approved, distilled from
 * Duolingo imagery guidelines + Coursera rebrand + Awwwards edtech nominees):
 *
 * 1. People-first, faces visible — the learner is the hero. No backs-to-camera,
 *    no impersonal distance, no empty rooms.
 * 2. Real-life naturalism — daylight, real workplaces/classrooms, natural hair
 *    and styling. No studio gray, no forced smiles, no bored faces.
 * 3. Indonesian specificity — hijab, kantor Jakarta, kelas daerah, wisuda lokal.
 *    Counter the "generic Asian office" the way Coursera counters stereotypes.
 * 4. Collaboration over posing — small groups doing real work, hands visible.
 * 5. Outcomes shown — graduation, dashboards, presentations (proof, not promise).
 * 6. Honest captions — every photo gets a real caption + "Foto: Pexels".
 *    Fictional companies always labeled fiktif (PRD §56).
 * 7. Presentation rule — never text directly on busy photos; use the
 *    .photo-cine scrim + caption-bar pattern from globals.css.
 *
 * All IDs below returned HTTP 200 on 2026-10-01. Do NOT guess new IDs —
 * verify with curl first, then add here so every page reuses one source.
 */

export const PX = (id: number, w: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const PHOTOS = {
  classroomID: 35548840, // Siswa belajar di kelas, Pandeglang Banten
  analystJKT: 34961614, // Analis muda + laptop, kantor Jakarta
  studyJKT: 36617340, // Mahasiswi membaca, Jakarta
  nightJKT: 34961765, // Profesional lembur malam, Jakarta
  teamAsia: 7845344, // Rapat tim bisnis Asia
  meetingDiverse: 7869341, // Meeting beragam, termasuk hijab
  campusSmile: 37648143, // Mahasiswa tersenyum di gedung kampus
  wisudaID: 29343927, // Wisudawan Indonesia merayakan kelulusan
} as const;
