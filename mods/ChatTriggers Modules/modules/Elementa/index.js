const  Window = Java.type("club.sk1er.elementa.components.Window")
const UIContainer = Java.type("club.sk1er.elementa.components.UIContainer")
const UIBlock = Java.type("club.sk1er.elementa.components.UIBlock")
const UIRoundedRectangle = Java.type("club.sk1er.elementa.components.UIRoundedRectangle")
const UICircle = Java.type("club.sk1er.elementa.components.UICircle")
const UIPoint = Java.type("club.sk1er.elementa.components.UIPoint")
const UIShape = Java.type("club.sk1er.elementa.components.UIShape")
const UIText = Java.type("club.sk1er.elementa.components.UIText")
const UIWrappedText = Java.type("club.sk1er.elementa.components.UIWrappedText")
const UITextInput = Java.type("club.sk1er.elementa.components.UITextInput")
const UIImage = Java.type("club.sk1er.elementa.components.UIImage")
const ScrollComponent = Java.type("club.sk1er.elementa.components.ScrollComponent")

const PixelConstraint = Java.type("club.sk1er.elementa.constraints.PixelConstraint")
const CenterConstraint = Java.type("club.sk1er.elementa.constraints.CenterConstraint")
const SiblingConstraint = Java.type("club.sk1er.elementa.constraints.SiblingConstraint")
const CramSiblingConstraint = Java.type("club.sk1er.elementa.constraints.CramSiblingConstraint")

const RelativeConstraint = Java.type("club.sk1er.elementa.constraints.RelativeConstraint")
const AspectConstraint = Java.type("club.sk1er.elementa.constraints.AspectConstraint")
const TextAspectConstraint = Java.type("club.sk1er.elementa.constraints.TextAspectConstraint")
const ImageAspectConstraint = Java.type("club.sk1er.elementa.constraints.ImageAspectConstraint")
const FillConstraint = Java.type("club.sk1er.elementa.constraints.FillConstraint")
const ChildBasedSizeConstraint = Java.type("club.sk1er.elementa.constraints.ChildBasedSizeConstraint")
const ChildBasedMaxSizeConstraint = Java.type("club.sk1er.elementa.constraints.ChildBasedMaxSizeConstraint")
const ScaledTextConstraint = Java.type("club.sk1er.elementa.constraints.ScaledTextConstraint")

const AdditiveConstraint = Java.type("club.sk1er.elementa.constraints.AdditiveConstraint")
const SubtractiveConstraint = Java.type("club.sk1er.elementa.constraints.SubtractiveConstraint")
const MinConstraint = Java.type("club.sk1er.elementa.constraints.MinConstraint")
const MaxConstraint = Java.type("club.sk1er.elementa.constraints.MaxConstraint")

const ConstantColorConstraint = Java.type("club.sk1er.elementa.constraints.ConstantColorConstraint")
const RainbowColorConstraint = Java.type("club.sk1er.elementa.constraints.RainbowColorConstraint")

const ScissorEffect = Java.type("club.sk1er.elementa.effects.ScissorEffect")
const StencilEffect = Java.type("club.sk1er.elementa.effects.StencilEffect")

const Animations = Java.type("club.sk1er.elementa.constraints.animation.Animations")

Number.prototype.pixels = function(alignedOpposite, alignedOutside) {
    if (alignedOpposite === undefined || typeof alignedOpposite !== 'boolean') {
        return new PixelConstraint(this)
    }
    
    if (alignedOutside === undefined || typeof alignedOutside !== 'boolean') {
        return new PixelConstraint(this, alignedOpposite)
    }

    return new PixelConstraint(this, alignedOpposite, alignedOutside)
}

export { 
    Window,
    UIContainer, UIBlock, UIRoundedRectangle, UICircle, UIPoint, UIShape, UIText, UIWrappedText, UITextInput, UIImage, ScrollComponent,
    PixelConstraint, CenterConstraint, SiblingConstraint, CramSiblingConstraint,
    RelativeConstraint, AspectConstraint, TextAspectConstraint, ImageAspectConstraint, FillConstraint, ChildBasedSizeConstraint, ChildBasedMaxSizeConstraint, ScaledTextConstraint,
    AdditiveConstraint, SubtractiveConstraint, MinConstraint, MaxConstraint,
    ConstantColorConstraint, RainbowColorConstraint,
    ScissorEffect, StencilEffect,
    Animations
 }