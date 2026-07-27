import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Textarea from "../components/common/Textarea";
import FileUpload from "../components/common/FileUpload";
import Button from "../components/common/Button";
import { generateTicketId } from "../utils/generateTicketId";
import { ROUTES } from "../routes/routePaths";
import { useGrievances } from "../context/GrievanceContext";

const categoryOptions = [
  { label: "Hostel", value: "hostel" },
  { label: "Academic", value: "academic" },
  { label: "Mess / Food", value: "mess" },
  { label: "Library", value: "library" },
  { label: "Scholarship", value: "scholarship" },
  { label: "Other", value: "other" },
];

const emptyFormData = {
  name: "",
  rollNumber: "",
  email: "",
  category: "",
  description: "",
};

function SubmitGrievancePage() {
  const navigate = useNavigate();
  // Pulls addGrievance from our Context - this is the function that
  // updates shared state AND (via the Context's internal useEffect)
  // automatically saves to localStorage.
  const { addGrievance } = useGrievances();

  const [formData, setFormData] = useState(emptyFormData);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.rollNumber.trim()) newErrors.rollNumber = "Roll number is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.category) newErrors.category = "Please select a category";

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Please provide at least 20 characters so admin has enough context";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    const hasErrors = Object.keys(validationErrors).length > 0;
    if (hasErrors) return;

    const newTicketId = generateTicketId();
    const submittedAt = new Date().toISOString();

    // Build the full grievance record. Notice: we spread formData first
    // (name, rollNumber, email, category, description), then add extra
    // fields on top. file?.name safely stores just the filename (or
    // undefined if no file was attached) - see explanation above about
    // why we can't store the real File object.
    const newGrievance = {
      ...formData,
      ticketId: newTicketId,
      status: "Pending",
      submittedAt,
      attachmentName: file?.name || null,
    };

    // Saves to Context state, which auto-persists to localStorage.
    addGrievance(newGrievance);

    // Navigate to the success page, carrying data via router state
    // (as built in Step 7) - this is separate from the Context save,
    // just used to display the confirmation screen.
    navigate(ROUTES.GRIEVANCE_SUCCESS, {
      state: { ticketId: newTicketId, submittedAt },
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">
        Submit a Grievance
      </h1>
      <p className="text-slate-600 text-center mb-8">
        Fill in the details below. You'll receive a Ticket ID to track your
        grievance.
      </p>

      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Ravi Kumar"
            error={errors.name}
            required
          />

          <Input
            label="Roll Number"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            placeholder="e.g., 2023BCA045"
            error={errors.rollNumber}
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g., ravi@gbu.ac.in"
            error={errors.email}
            required
          />

          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categoryOptions}
            error={errors.category}
            required
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your issue in detail..."
            rows={5}
            maxLength={500}
            error={errors.description}
            required
          />

          <FileUpload
            label="Supporting File (Optional)"
            name="attachment"
            file={file}
            onFileSelect={handleFileSelect}
          />

          <Button type="submit" variant="primary" className="mt-2">
            Submit Grievance
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default SubmitGrievancePage;