




import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  clearAllProjectErrors,
  deleteProject,
  getAllProjects,
  resetProjectSlice,
} from "@/store/slices/projectSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  Eye,
  Pen,
  Trash2,
  Users,
  ArrowLeft,
  Loader,
} from "lucide-react";
import {
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import {
  toast,
} from "react-toastify";

const ManageProjects = () => {

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const {
    projects,
    loading,
    error,
    message,
  } = useSelector(
    (state) => state.project
  );

  // =========================================
  // RETURN DASHBOARD
  // =========================================

  const handleReturnToDashboard = useCallback(() => {
    navigateTo("/");
  }, [navigateTo]);

  // =========================================
  // DELETE PROJECT WITH CONFIRMATION
  // =========================================

  const handleProjectDelete = useCallback((id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      dispatch(deleteProject(id));
    }
  }, [dispatch]);

  // =========================================
  // GET ALL PROJECTS ON PAGE LOAD
  // =========================================

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  // =========================================
  // HANDLE ERRORS & SUCCESS
  // =========================================

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 4000,
      });
      dispatch(clearAllProjectErrors());
    }

    if (message) {
      toast.success(message, {
        position: "top-right",
        autoClose: 4000,
      });
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [dispatch, error, message]);

  // =========================================
  // MEMOIZE FILTERED PROJECTS
  // =========================================

  const validProjects = useMemo(() => {
    return projects?.filter((project) => project && project._id) || [];
  }, [projects]);

  // =========================================
  // ACTION BUTTON COMPONENT
  // =========================================

  const ActionButton = ({ icon: Icon, label, color, onClick, to }) => {
    const buttonClass = `
      border-2
      rounded-full
      h-9
      w-9
      flex
      justify-center
      items-center
      transition-all
      duration-200
      hover:scale-110
      focus:outline-none
      focus:ring-2
      focus:ring-offset-2
      focus:ring-${color}-500
    `;

    const colorClasses = {
      green: "border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
      yellow: "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white",
      red: "border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
      blue: "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    };

    const buttonContent = (
      <button
        className={`${buttonClass} ${colorClasses[color]}`}
        onClick={onClick}
        aria-label={label}
      >
        <Icon className="h-5 w-5" />
      </button>
    );

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {to ? (
              <Link to={to}>
                {buttonContent}
              </Link>
            ) : (
              buttonContent
            )}
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">

      <Tabs defaultValue="week" className="w-full">

        <TabsList className="grid w-fit grid-cols-1 mb-6">
          <TabsTrigger value="week">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="week" className="space-y-4">

          <Card className="shadow-lg border-0 rounded-xl overflow-hidden">

            {/* HEADER */}
            <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-6">

              <div>
                <CardTitle className="text-2xl sm:text-3xl font-bold">
                  Manage Your Projects
                </CardTitle>

                <p className="text-sm text-slate-300 mt-2">
                  View, edit, delete and manage your project buyers
                </p>
              </div>

              <Button
                onClick={handleReturnToDashboard}
                variant="outline"
                className="w-fit border-white text-white hover:bg-white hover:text-slate-900 transition-all"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>

            </CardHeader>

            {/* CONTENT */}
            <CardContent className="p-0">

              <div className="overflow-x-auto">

                <Table>

                  {/* TABLE HEADER */}
                  <TableHeader className="bg-slate-50 border-b-2 border-slate-200">

                    <TableRow>

                      <TableHead className="font-semibold text-slate-700">
                        Banner
                      </TableHead>

                      <TableHead className="font-semibold text-slate-700">
                        Title
                      </TableHead>

                      <TableHead className="hidden md:table-cell font-semibold text-slate-700">
                        Stack
                      </TableHead>

                      <TableHead className="hidden md:table-cell font-semibold text-slate-700">
                        Deployed
                      </TableHead>

                      <TableHead className="hidden md:table-cell font-semibold text-slate-700">
                        Type
                      </TableHead>

                      <TableHead className="font-semibold text-slate-700 text-right pr-6">
                        Actions
                      </TableHead>

                    </TableRow>

                  </TableHeader>

                  {/* TABLE BODY */}
                  <TableBody>

                    {validProjects.length > 0 ? (

                      validProjects.map((element) => (

                        <TableRow
                          key={element._id}
                          className="hover:bg-slate-50 transition-colors border-b border-slate-100"
                        >

                          {/* BANNER */}
                          <TableCell className="py-4 px-4">

                            {element.projectBanner?.url ? (
                              <img
                                src={element.projectBanner.url}
                                alt={element.title || "Project banner"}
                                className="w-16 h-16 rounded-lg object-cover border-2 border-slate-200 shadow-sm"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-lg bg-slate-200 flex items-center justify-center text-xs text-slate-500">
                                No image
                              </div>
                            )}

                          </TableCell>

                          {/* TITLE */}
                          <TableCell className="py-4 px-4">

                            <div className="font-semibold text-slate-900 truncate max-w-xs">
                              {element.title || "Untitled Project"}
                            </div>

                          </TableCell>

                          {/* STACK */}
                          <TableCell className="hidden md:table-cell py-4 px-4 text-slate-600">

                            {element.stack || "—"}

                          </TableCell>

                          {/* DEPLOYED */}
                          <TableCell className="hidden md:table-cell py-4 px-4 text-slate-600">

                            {element.deployed ? (
                              <span className="text-green-600 font-medium">✓ Yes</span>
                            ) : (
                              <span className="text-slate-400">✗ No</span>
                            )}

                          </TableCell>

                          {/* TYPE / PRICING */}
                          <TableCell className="hidden md:table-cell py-4 px-4">

                            {element.isPaid ? (
                              <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-semibold border border-red-200">
                                Paid ₹{element.price || "0"}
                              </span>
                            ) : (
                              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold border border-green-200">
                                Free
                              </span>
                            )}

                          </TableCell>

                          {/* ACTIONS */}
                          <TableCell className="py-4 px-4">

                            <div className="flex items-center gap-2 justify-end flex-wrap">

                              <ActionButton
                                icon={Eye}
                                label="View"
                                color="green"
                                to={`/view/project/${element._id}`}
                              />

                              <ActionButton
                                icon={Pen}
                                label="Edit"
                                color="yellow"
                                to={`/update/project/${element._id}`}
                              />

                              <ActionButton
                                icon={Trash2}
                                label="Delete"
                                color="red"
                                onClick={() =>
                                  handleProjectDelete(
                                    element._id,
                                    element.title || "Project"
                                  )
                                }
                              />

                              <ActionButton
                                icon={Users}
                                label="Buyers"
                                color="blue"
                                to={`/project/buyers/${element._id}`}
                              />

                            </div>

                          </TableCell>

                        </TableRow>
                      ))

                    ) : (

                      <TableRow>

                        <TableCell
                          colSpan={6}
                          className="text-center py-16 px-4"
                        >

                          {loading ? (
                            <div className="flex flex-col items-center justify-center gap-3">
                              <Loader className="h-8 w-8 text-slate-400 animate-spin" />
                              <p className="text-slate-600 font-medium">
                                Loading projects...
                              </p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <p className="text-xl font-semibold text-slate-600 mb-2">
                                No projects yet
                              </p>
                              <p className="text-slate-500 text-sm">
                                Start by creating your first project to get started.
                              </p>
                            </div>
                          )}

                        </TableCell>

                      </TableRow>

                    )}

                  </TableBody>

                </Table>

              </div>

            </CardContent>

          </Card>

        </TabsContent>

      </Tabs>

    </div>
  );
};

export default ManageProjects;