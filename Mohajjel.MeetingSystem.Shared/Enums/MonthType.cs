using System.ComponentModel.DataAnnotations;

namespace Mohajjel.MeetingSystem.Shared.Enums
{
    public enum MonthType
    {
        [Display(Name = "فروردین")]
        فروردین = 1,

        [Display(Name = "اردیبهشت")]
        اردیبهشت = 2,

        [Display(Name = "خرداد")]
        خرداد = 3,

        [Display(Name = "تیر")]
        تیر = 4,

        [Display(Name = "مرداد")]
        مرداد = 5,

        [Display(Name = "شهریور")]
        شهریور = 6,

        [Display(Name = "مهر")]
        مهر = 7,

        [Display(Name = "آبان")]
        آبان = 8,

        [Display(Name = "آذر")]
        آذر = 9,

        [Display(Name = "دی")]
        دی = 10,

        [Display(Name = "بهمن")]
        بهمن = 11,

        [Display(Name = "اسفند")]
        اسفند = 12
    }
}