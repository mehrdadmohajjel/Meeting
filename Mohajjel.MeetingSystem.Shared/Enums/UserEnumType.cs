using System.ComponentModel.DataAnnotations;

namespace Mohajjel.MeetingSystem.Shared.Enums
{
    public enum UserEnumType
    {
        [Display(Name = "مدیران")]
        ManagerUserTypeValue = 1,

        [Display(Name = "روسا")]
        BossUserTypeValue = 2,

        [Display(Name = "سرپرستان")]
        SupervisorTypeValue = 3,

        [Display(Name = "پرسنل امور")]
        DepartmentTypeValue = 4,

        [Display(Name = "سایر پرسنل")]
        AllUserTypeValue = 5,
            
        [Display(Name = "افراد خارج از سازمان")]
        OutsideUserTypeValue = 6
    }
}