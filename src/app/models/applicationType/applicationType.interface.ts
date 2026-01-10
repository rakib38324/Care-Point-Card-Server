export type TApplicationType = {
  _id: string;
  applicantTitle: string;
  price: number;
  isDeleted: boolean;
  userRole: string;

  // ================= System Fields =================
  createdAt: Date;
  updatedAt: Date;
};
